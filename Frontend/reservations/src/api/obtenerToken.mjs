import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ComponenteProtegido() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/registro");
    }
  }, [navigate]);

  return <div>Contenido protegido</div>;
}

export default ComponenteProtegido