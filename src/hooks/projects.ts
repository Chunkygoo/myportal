import type { siteDiary } from "../pages/projects/[projectId]/site-diary";
import { api } from "../utils/api";

export const useGetSiteDiaresQuery = ({
  projectId,
  initialData,
}: {
  projectId: string;
  initialData: siteDiary[];
}) => {
  const { data, isLoading, isError } = api.project.getSiteDiaries.useQuery(
    {
      projectId: projectId,
    },
    {
      initialData: {
        siteDiaries: initialData,
      },
      staleTime: 0, // this is the default but putting it here to remind devs
    }
  );
  return {
    siteDiaries: data.siteDiaries,
    isLoading: isLoading,
    isError: isError,
  };
};
