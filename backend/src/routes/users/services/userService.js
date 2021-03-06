const { User, OauthProfile, Op, conn } = require("../../../db");

const userService = {
  createUser: async (userData) => {
    const { username, password, firstName, lastName, email, type, verified } =
      userData;
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
      if (existingUser) {
        return [existingUser, false];
      } else {
        const user = await User.create({
          username,
          password,
          firstName,
          lastName,
          email,
          type,
          verified,
        });
        return [user, true];
      }
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * @function createSocialUser: first try to find en existin user, if user exists
   * add the oauthProfile (beacouse in the GitHub strategy already check if OauthProfile exists),
   * if no user exists then create a complete socialUser
   * @return [user::User, created::Boolean] (user linked with a provider)
   */
  createSocialUser: async (username, email, oauthProfile) => {
    try {
      const { profileId, provider } = oauthProfile;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
          isActive: true,
        },
        include: OauthProfile,
      });

      if (existingUser) {
        //existin user
        const [profile, created] = await OauthProfile.findOrCreate({
          where: { provider },
          defaults: { profileId },
        });
        console.log(profile.toJSON());
        if (!created) {
          // existin user profile
          return [existingUser, false];
        } else {
          // existin user without profile
          existingUser.addOauthProfile(profile);
          return [existingUser, false];
        }
      } else {
        // no user --> create a new one
        const user = await User.create(
          {
            username,
            email,
            verified: true,
            OauthProfiles: { profileId, provider },
          },
          { include: [{ association: User.OauthProfile }] }
        );
        return [user, true];
      }
    } catch (error) {
      console.error(error);
    }
  },

  findUserByOauthProfile: async (profile) => {
    const { profileId, provider } = profile;
    try {
      const user = await User.findOne({
        where: { isActive: true },
        include: [{ model: OauthProfile, where: { profileId, provider } }],
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  },
  find: async (userId) => {
    try {
      const user = await User.findByPk(userId, { where: { isActive: true } });
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  findByEmailOrUsername: async ({ email, username }) => {
    const query = {};
    if (email && username) {
      query.where = {
        [Op.or]: [{ email }, { username }],
        isActive: true,
      };
    } else if (email && !username) {
      query.where = { email };
    } else if (!email && username) {
      query.where = { username };
    }
    try {
      const user = await User.findOne(query);
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  updateUser: async (userData) => {
    try {
      const user = await User.findByPk(userData.id);
      if (!user || !user.isActive) {
        return "no user found";
      }
      const where = (userData.username && { username: userData.username }) || {
        username: "",
      };
      const existingUser = await User.findOne({
        where,
      });
      if (!existingUser) {
        await user.update(userData);
        await user.save();
        return "successfully updated";
      }
      return "unique key restricction violated";
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userService;
