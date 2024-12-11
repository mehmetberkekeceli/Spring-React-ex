import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles.scss";

function VisitorCounter(): JSX.Element {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    setVisitorCount((prevCount) => prevCount + 1);

    return () => {
      setVisitorCount(0);
    };
  }, []);

  return (
    <div>
      <Button
        label={`Aktif: ${visitorCount} Ziyaretçi`}
        className="visitor"
        icon="pi pi-users"
        onClick={() => setVisitorCount(visitorCount + 1)}
      />
    </div>
  );
}

export default VisitorCounter;
