import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useLogout } from "../auth/auth";

export const loginMutationGQL = gql`
  mutation customUpdateJudgeVotes($input: [Judge_inputInsertInput]) {
    customUpdateJudgeVotes(input:$input) {
      id
    }
  }
`;

export const useUpdateMutation = () => {

  const  logout= useLogout();

  const [mutation,mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      logout();
      return true;
    },
  });
  // full login function
  const updateJudgeVote = (vote) => {
    return mutation({
      variables: {
        input: vote
      },
    });
  }
  return [updateJudgeVote,mutationResults]
};