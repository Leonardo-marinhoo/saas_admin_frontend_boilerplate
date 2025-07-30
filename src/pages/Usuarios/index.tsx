import React from "react";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import {
  useGetTenantUsersQuery,
  useCreateTenantUserMutation,
} from "../../services/api/tenantApi";
import * as S from "./styles";
import { useState } from "react";
import { Modal } from "../../components/ui/Modal";

const Usuarios: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetTenantUsersQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role_type: "kitchen" | "delivery";
  }>({
    name: "",
    email: "",
    password: "",
    role_type: "kitchen",
  });
  const [createUser, { isLoading: isCreating }] = useCreateTenantUserMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setForm({ name: "", email: "", password: "", role_type: "kitchen" });
    setFormError(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setFormError("Preencha todos os campos.");
      return;
    }
    try {
      await createUser(form).unwrap();
      setModalOpen(false);
      refetch();
    } catch (err: any) {
      setFormError(err?.data?.message || "Erro ao criar usuário.");
    }
  };

  return (
    <Container>
      <PageHeader
        title="Usuários do Estabelecimento"
        actions={
          <S.AddButton type="button" onClick={handleOpenModal}>
            + Adicionar Usuário
          </S.AddButton>
        }
        style={{ marginBottom: 24 }}
      />
      <Card>
        {isLoading && <S.Loading>Carregando...</S.Loading>}
        {error && <S.Error>Erro ao carregar usuários.</S.Error>}
        {data && (
          <S.UsersTable>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.description || user.role?.name}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </S.UsersTable>
        )}
      </Card>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title="Adicionar Usuário"
      >
        <form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>Nome</S.Label>
            <S.Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Email</S.Label>
            <S.Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Senha</S.Label>
            <S.Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Tipo</S.Label>
            <S.Select
              name="role_type"
              value={form.role_type}
              onChange={handleChange}
              required
            >
              <option value="kitchen">Cozinha</option>
              <option value="delivery">Entregador</option>
            </S.Select>
          </S.FormGroup>
          {formError && <S.Error>{formError}</S.Error>}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 16,
            }}
          >
            <S.AddButton type="submit" disabled={isCreating}>
              {isCreating ? "Adicionando..." : "Adicionar"}
            </S.AddButton>
            <S.CancelButton type="button" onClick={handleCloseModal}>
              Cancelar
            </S.CancelButton>
          </div>
        </form>
      </Modal>
    </Container>
  );
};

export default Usuarios;
