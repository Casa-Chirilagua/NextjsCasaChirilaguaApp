import Link from 'next/link';

function NumberCard({
  name,
  number,
  labelColor,
  numberColor,
  backgroundColor,
  icon,
  urlLink,
  linkLabel,
  classN
}) {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`number-card-container ${classN}`}
    >
      <div style={{ color: labelColor }} className="card-name">
        <h4>{name}</h4>
        {icon}
      </div>
      <div style={{ color: numberColor }} className="card-number">
        {number}
      </div>
      {urlLink && <div className="card-link">
        <Link href={urlLink}>{linkLabel}</Link>
      </div>}
    </div>
  );
}

export default NumberCard;
