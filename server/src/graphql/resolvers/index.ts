import { userResolver } from "./userResolvers";

export const queryResolver = {
  ...userResolver,
  Query: {...userResolver.Query},
  Mutation: {
    ...userResolver.Mutation,
  },
};
