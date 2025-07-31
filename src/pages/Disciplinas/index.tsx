const disciplinas = [
  { id: 1, nome: "Matemática", cor: "#FFD6E8" },
  { id: 2, nome: "Português", cor: "#C9E4FF" },
  { id: 3, nome: "História", cor: "#FFF4D6" },
  { id: 4, nome: "Biologia", cor: "#D6FFE1" },
  { id: 5, nome: "Física", cor: "#F0D6FF" },
  { id: 6, nome: "Química", cor: "#D6F0FF" },
];

const DisciplinasPage = () => {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Inter, sans-serif",
        background: "#F8F9FC",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#333" }}>
        📚 Disciplinas
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {disciplinas.map((disciplina) => (
          <div
            key={disciplina.id}
            style={{
              flex: "1 1 220px",
              background: disciplina.cor,
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
            }}
          >
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                {disciplina.nome}
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "#555",
                  fontSize: "0.9rem",
                }}
              >
                Aula de introdução e materiais disponíveis
              </p>
            </div>
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <button
                style={{
                  background: "#6A5ACD",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                Acessar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisciplinasPage;
