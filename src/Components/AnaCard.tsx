interface IAnaCard {
  number: number;
  content: string;
  classname: string;
}

export const AnaCard: React.FC<IAnaCard> = (props) => {
  return (
    <div className={props.classname}>
      <span style={{ fontSize: "40px" }}>{props.number}</span>
      <br />
      <span>{props.content}</span>
    </div>
  );
};
