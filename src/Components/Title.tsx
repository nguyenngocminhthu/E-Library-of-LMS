interface ITitle {
  content: string;
}

export const TitleComp: React.FC<ITitle> = (props) => {
  return <div className="title">{props.content}</div>;
};
