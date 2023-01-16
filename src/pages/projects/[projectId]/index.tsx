import Link from "next/link";
import { useRouter } from "next/router";
import PermissionToProject from "../../../components/auth/PermissionToProject";

const Index = () => {
  const { query } = useRouter();
  const projectId = query.projectId as string;
  return (
    <PermissionToProject projectId={projectId}>
      <p>Viewing project: {projectId}</p>
      <Link href={`/projects/${projectId}/site-diary`}>Site diary</Link>
    </PermissionToProject>
  );
};

export default Index;
