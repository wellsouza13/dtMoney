interface RepositoryProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
}

export function RepositoryItem(props: RepositoryProps) {
  return (
    <li>
      <strong>{props.repository?.name}</strong>
      <p>{props.repository?.description}</p>
      <a href={props.repository?.html_url}>Acessar</a>
    </li>
  );
}
