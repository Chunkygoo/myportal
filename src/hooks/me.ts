import { api } from "../utils/api";

export const useGetMyProjectsQuery = () => {
  const { data, isLoading, isError } = api.me.getProjects.useQuery();
  return {
    projects: data,
    isLoading: isLoading,
    isError: isError,
  };
};

export const useHasPermissionToProject = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { data, isLoading, isError } = api.me.hasPermissionToProject.useQuery({
    projectId: projectId,
  });
  return {
    hasPermission: data,
    isLoading: isLoading,
    isError: isError,
  };
};
