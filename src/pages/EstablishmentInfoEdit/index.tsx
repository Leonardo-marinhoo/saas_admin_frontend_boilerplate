import React, { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Flex } from "../../components/ui/Flex";
import { Card } from "../../components/ui/Card";
import {
  useGetTenantInfoQuery,
  useUpdateTenantInfoMutation,
  useUpdateTenantStatusMutation,
  useCreateCheckoutSessionMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useUpdateDeliveryTaxMutation,
} from "../../services/api/tenantApi";
import planBanner from "../../assets/planbanner.jpg";
import chipImg from "../../assets/chip.png";
import {
  Text,
  Heading,
  Separator,
  Label,
  FileInput,
  Avatar,
  BannerPreview,
  Button,
  GlobalStyles,
  PlanSection,
  CreditCard,
  PlanSidePanel,
  PlanNotice,
  CardContent,
  CardHeader,
  CardLogoRow,
  CardLogo,
  CardTitle,
  CardChip,
  CardDetails,
  CardMainInfo,
  CardNumberLabel,
  CardNumber,
  CardName,
  CardValidBlock,
  CardValidLabel,
  CardValidThru,
  DeliveryTaxSection,
  DeliveryTaxInput,
  UpdateButton,
  SwitchContainer,
  SwitchInput,
  SwitchSlider,
  TextField,
} from "./styles";

/** Função utilitária para formatar datas timestamp para dd/mm/yyyy */
function formatDate(dateStr?: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("pt-BR");
}

const initialState = {
  name: "",
  domain: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  logo: undefined as File | undefined,
  banner: undefined as File | undefined,
};

export default function EstablishmentInfoEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialState);
  const [logoPreview, setLogoPreview] = useState<string | undefined>();
  const [bannerPreview, setBannerPreview] = useState<string | undefined>();
  const [deliveryTax, setDeliveryTax] = useState<string>("");

  const { data: tenantInfo, isLoading, error } = useGetTenantInfoQuery();
  const [updateTenantInfo, { isLoading: isUpdating }] =
    useUpdateTenantInfoMutation();
  const [updateTenantStatus, { isLoading: isUpdatingStatus }] =
    useUpdateTenantStatusMutation();
  const [createCheckoutSession, { isLoading: isCreatingCheckout }] =
    useCreateCheckoutSessionMutation();
  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();
  const [reactivateSubscription, { isLoading: isReactivating }] =
    useReactivateSubscriptionMutation();
  const [updateDeliveryTax, { isLoading: isUpdatingDeliveryTax }] =
    useUpdateDeliveryTaxMutation();

  // Determinar se está recebendo pedidos baseado no status do tenant
  const isReceivingOrders = tenantInfo?.status === "online";

  const handleToggleReceivingOrders = async () => {
    try {
      const newStatus = isReceivingOrders ? "offline" : "online";
      await updateTenantStatus({ status: newStatus }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleActivatePlan = async () => {
    try {
      const response = await createCheckoutSession().unwrap();
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (err) {
      alert("Erro ao ativar plano. Tente novamente.");
    }
  };

  const handleReactivatePlan = async () => {
    try {
      const response = await reactivateSubscription().unwrap();
      if (response.requires_payment && response.url) {
        window.location.href = response.url;
      } else {
        alert(response.message || "Plano reativado com sucesso!");
      }
    } catch (err) {
      alert("Erro ao reativar plano. Tente novamente.");
    }
  };

  const handleUpdateDeliveryTax = async () => {
    if (!deliveryTax.trim()) {
      alert("Por favor, insira um valor para a taxa de delivery.");
      return;
    }

    const taxValue = parseFloat(deliveryTax.replace(",", "."));
    if (isNaN(taxValue) || taxValue < 0) {
      alert("Por favor, insira um valor válido para a taxa de delivery.");
      return;
    }

    try {
      await updateDeliveryTax({ delivery_tax: taxValue.toString() }).unwrap();
      alert("Taxa de delivery atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar taxa de delivery:", error);
      alert("Erro ao atualizar taxa de delivery. Tente novamente.");
    }
  };

  // Carregar dados do tenant quando disponíveis
  React.useEffect(() => {
    if (tenantInfo && !isEditing) {
      const updatedForm = {
        name: tenantInfo.name || "",
        domain: tenantInfo.domain || "",
        street: tenantInfo.street || "",
        number: tenantInfo.number || "",
        neighborhood: tenantInfo.neighborhood || "",
        city: tenantInfo.city || "",
        state: tenantInfo.state || "",
        zip_code: tenantInfo.zip_code || "",
        country: tenantInfo.country || "",
        logo: undefined,
        banner: undefined,
      };
      setForm(updatedForm);
      setLogoPreview(tenantInfo.logo);
      setBannerPreview(tenantInfo.banner);
      setDeliveryTax(tenantInfo.delivery_tax || "0.00");
    }
  }, [tenantInfo, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      if (name === "logo") setLogoPreview(URL.createObjectURL(files[0]));
      if (name === "banner") setBannerPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (tenantInfo) {
      setForm({
        name: tenantInfo.name || "",
        domain: tenantInfo.domain || "",
        street: tenantInfo.street || "",
        number: tenantInfo.number || "",
        neighborhood: tenantInfo.neighborhood || "",
        city: tenantInfo.city || "",
        state: tenantInfo.state || "",
        zip_code: tenantInfo.zip_code || "",
        country: tenantInfo.country || "",
        logo: undefined,
        banner: undefined,
      });
      setLogoPreview(tenantInfo.logo);
      setBannerPreview(tenantInfo.banner);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (
      !form.name.trim() ||
      !form.street.trim() ||
      !form.number.trim() ||
      !form.neighborhood.trim() ||
      !form.city.trim() ||
      !form.state.trim()
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    try {
      await updateTenantInfo({
        name: form.name,
        domain: form.domain,
        street: form.street,
        number: form.number,
        neighborhood: form.neighborhood,
        city: form.city,
        state: form.state,
        zip_code: form.zip_code,
        country: form.country,
        logo: form.logo,
        banner: form.banner,
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
      alert(
        "Erro ao salvar as informações. Verifique os dados e tente novamente."
      );
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Card>
          <Flex direction="column" align="center" gap="16px">
            <Text size="4">Carregando informações...</Text>
          </Flex>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <Flex direction="column" align="center" gap="16px">
            <Text size="4" style={{ color: "red" }}>
              Erro ao carregar informações do estabelecimento
            </Text>
          </Flex>
        </Card>
      </Container>
    );
  }

  return (
    <GlobalStyles>
      <Container>
        {/* Sessão do Plano/Assinatura */}
        {tenantInfo?.subscription && (
          <PlanSection bg={planBanner}>
            <CreditCard>
              <CardContent>
                <CardHeader>
                  <CardLogoRow>
                    {tenantInfo.logo && (
                      <CardLogo
                        src={tenantInfo.logo}
                        alt="Logo do estabelecimento"
                      />
                    )}
                    <CardTitle>{tenantInfo.name}</CardTitle>
                  </CardLogoRow>
                  <CardChip src={chipImg} alt="Chip" />
                </CardHeader>
                <CardDetails>
                  <CardMainInfo>
                    <CardNumberLabel>Plano</CardNumberLabel>
                    <CardNumber>Menu Flow Premium</CardNumber>
                    <CardName>{tenantInfo.subscription.status}</CardName>
                  </CardMainInfo>
                  <CardValidBlock>
                    <CardValidLabel>Próxima Cobrança</CardValidLabel>
                    <CardValidThru>
                      {formatDate(tenantInfo.subscription.next_billing_date)}
                    </CardValidThru>
                  </CardValidBlock>
                </CardDetails>
              </CardContent>
            </CreditCard>
            <PlanSidePanel>
              {/* Avisos importantes */}
              <Flex direction="column" gap="4px">
                <PlanNotice>
                  <strong>Aviso de Segurança:</strong> Não armazenamos dados de
                  pagamento.
                </PlanNotice>
                <PlanNotice>
                  Você pode cancelar seu plano a qualquer momento usando o botão
                  abaixo, sem burocracia.
                </PlanNotice>
                <PlanNotice>
                  O acesso ao sistema será mantido até o fim do período já pago,
                  mesmo após o cancelamento.
                </PlanNotice>
                {/* <PlanNotice>
                Em caso de dúvidas, entre em contato com nosso suporte.
              </PlanNotice> */}
              </Flex>
              {/* Mensagens de status */}
              {(!tenantInfo.subscription ||
                tenantInfo.subscription.type === "trial") && (
                <Text size="3">
                  Você está em período de avaliação gratuita.
                </Text>
              )}
              {tenantInfo.subscription?.type === "free" && (
                <Text size="3">Você está usando o plano gratuito.</Text>
              )}
              {tenantInfo.subscription?.status === "active" &&
                tenantInfo.subscription.type !== "trial" &&
                tenantInfo.subscription.type !== "free" && (
                  <Text size="3">Seu plano está ativo.</Text>
                )}
              {tenantInfo.subscription?.status === "cancelled" && (
                <Text size="3" style={{ color: "orange" }}>
                  Plano cancelado. Reative para continuar usando.
                </Text>
              )}
              {tenantInfo.subscription?.status === "past_due" && (
                <Text size="3" style={{ color: "red" }}>
                  Pagamento em atraso! Regularize para não perder acesso.
                </Text>
              )}
              {/* Seção de ações em destaque */}
              <Flex direction="column" gap="12px">
                {/* Ativar Plano */}
                {(tenantInfo.subscription?.type === "free" ||
                  tenantInfo.subscription?.status === "trial") && (
                  <Button
                    onClick={handleActivatePlan}
                    disabled={isCreatingCheckout}
                  >
                    {isCreatingCheckout ? "Ativando..." : "Ativar Plano"}
                  </Button>
                )}
                {/* Cancelar Plano */}
                {tenantInfo.subscription?.status === "active" &&
                  tenantInfo.subscription.type !== "trial" &&
                  tenantInfo.subscription.type !== "free" && (
                    <Button
                      onClick={() => cancelSubscription()}
                      disabled={isCancelling}
                      variant="soft"
                      data-cancel="true"
                    >
                      {isCancelling ? "Cancelando..." : "Cancelar Plano"}
                    </Button>
                  )}
                {/* Reativar Plano */}
                {tenantInfo.subscription?.type === "paid" &&
                  (tenantInfo.subscription?.status === "cancelled" ||
                    tenantInfo.subscription?.status === "past_due") && (
                    <Button
                      onClick={handleReactivatePlan}
                      disabled={isReactivating}
                    >
                      {isReactivating ? "Reativando..." : "Reativar Plano"}
                    </Button>
                  )}
              </Flex>
            </PlanSidePanel>
          </PlanSection>
        )}
        {/* Fim Sessão do Plano */}

        {/* Seção Taxa de Delivery */}
        <DeliveryTaxSection>
          <Flex direction="column" gap="16px">
            <Flex direction="column" gap="8px">
              <Heading size="4" weight="medium">
                Taxa de Delivery
              </Heading>
              <Text color="gray" size="3">
                Configure o valor da taxa de delivery por quilômetro rodado
              </Text>
            </Flex>

            <Flex direction="row" gap="16px" align="end">
              <Flex direction="column" gap="4px">
                <Text weight="medium" size="2">
                  Taxa por KM (R$)
                </Text>
                <DeliveryTaxInput
                  type="text"
                  value={deliveryTax}
                  onChange={(e) => setDeliveryTax(e.target.value)}
                  placeholder="0.00"
                  maxLength={10}
                />
              </Flex>
              <UpdateButton
                onClick={handleUpdateDeliveryTax}
                disabled={isUpdatingDeliveryTax}
              >
                {isUpdatingDeliveryTax ? (
                  "Atualizando..."
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 2v6h-6" />
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                      <path d="M3 22v-6h6" />
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                    </svg>
                    Atualizar
                  </>
                )}
              </UpdateButton>
            </Flex>
          </Flex>
        </DeliveryTaxSection>

        <Card $isEditing={isEditing}>
          <Flex direction="column" gap="24px">
            <Flex direction="column" gap="8px">
              <Flex direction="row" justify="between" align="start">
                <Heading size="6" weight="bold">
                  Configurações do Estabelecimento
                </Heading>
                <Flex align="center" gap="16px">
                  <Text weight="medium" size="2">
                    Aceitando Pedidos
                  </Text>
                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={isReceivingOrders}
                      onChange={handleToggleReceivingOrders}
                      disabled={isUpdatingStatus}
                    />
                    <SwitchSlider />
                  </SwitchContainer>
                  {!isEditing && (
                    <Button onClick={handleEdit} size="3">
                      Editar
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Text color="gray" size="3">
                {isEditing
                  ? "Edite as informações do seu estabelecimento"
                  : "Visualize as informações do seu estabelecimento"}
              </Text>
            </Flex>

            <Separator />

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="20px">
                {/* Informações Básicas */}
                <Flex direction="column" gap="16px">
                  <Heading size="4" weight="medium">
                    Informações Básicas
                  </Heading>

                  <Flex direction="column" gap="8px">
                    <Label htmlFor="name">
                      <Text weight="medium" size="2">
                        Nome do Estabelecimento *
                      </Text>
                    </Label>
                    <TextField
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      placeholder="Digite o nome do seu estabelecimento"
                      disabled={!isEditing}
                    />
                  </Flex>

                  <Flex direction="column" gap="8px">
                    <Label htmlFor="domain">
                      <Text weight="medium" size="2">
                        Domínio
                      </Text>
                    </Label>
                    <TextField
                      id="domain"
                      name="domain"
                      value={form.domain}
                      onChange={handleChange}
                      maxLength={255}
                      placeholder="exemplo.com.br"
                      disabled={!isEditing}
                    />
                  </Flex>

                  <Flex direction="row" gap="12px" className="address-row">
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="street">
                        <Text weight="medium" size="2">
                          Rua *
                        </Text>
                      </Label>
                      <TextField
                        id="street"
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        required
                        placeholder="Rua"
                        disabled={!isEditing}
                      />
                    </Flex>
                    <Flex direction="column" gap="8px" flex={1}>
                      <Label htmlFor="number">
                        <Text weight="medium" size="2">
                          Número *
                        </Text>
                      </Label>
                      <TextField
                        id="number"
                        name="number"
                        value={form.number}
                        onChange={handleChange}
                        required
                        placeholder="N°"
                        disabled={!isEditing}
                      />
                    </Flex>
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="neighborhood">
                        <Text weight="medium" size="2">
                          Bairro *
                        </Text>
                      </Label>
                      <TextField
                        id="neighborhood"
                        name="neighborhood"
                        value={form.neighborhood}
                        onChange={handleChange}
                        required
                        placeholder="Bairro"
                        disabled={!isEditing}
                      />
                    </Flex>
                  </Flex>

                  <Flex direction="row" gap="12px" className="city-state-row">
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="city">
                        <Text weight="medium" size="2">
                          Cidade *
                        </Text>
                      </Label>
                      <TextField
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Cidade"
                        disabled={!isEditing}
                      />
                    </Flex>
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="state">
                        <Text weight="medium" size="2">
                          Estado *
                        </Text>
                      </Label>
                      <TextField
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        placeholder="Estado"
                        disabled={!isEditing}
                      />
                    </Flex>
                  </Flex>

                  <Flex direction="row" gap="12px" className="zip-country-row">
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="zip_code">
                        <Text weight="medium" size="2">
                          CEP
                        </Text>
                      </Label>
                      <TextField
                        id="zip_code"
                        name="zip_code"
                        value={form.zip_code}
                        onChange={handleChange}
                        placeholder="CEP"
                        disabled={!isEditing}
                      />
                    </Flex>
                    <Flex direction="column" gap="8px" flex={2}>
                      <Label htmlFor="country">
                        <Text weight="medium" size="2">
                          País
                        </Text>
                      </Label>
                      <TextField
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="País"
                        disabled={!isEditing}
                      />
                    </Flex>
                  </Flex>
                </Flex>

                <Separator />

                {/* Imagens */}
                <Flex direction="column" gap="16px">
                  <Heading size="4" weight="medium">
                    Imagens
                  </Heading>

                  <Flex direction="column" gap="12px">
                    <Label htmlFor="logo">
                      <Text weight="medium" size="2">
                        Logo do Estabelecimento
                      </Text>
                    </Label>
                    <Flex gap="12px" align="center">
                      <FileInput
                        id="logo"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Flex>
                    {logoPreview && (
                      <Avatar src={logoPreview} alt="Logo preview" />
                    )}
                  </Flex>

                  <Flex direction="column" gap="12px">
                    <Label htmlFor="banner">
                      <Text weight="medium" size="2">
                        Banner do Estabelecimento
                      </Text>
                    </Label>
                    <Flex gap="12px" align="center">
                      <FileInput
                        id="banner"
                        name="banner"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Flex>
                    {bannerPreview && (
                      <BannerPreview src={bannerPreview} alt="Banner preview" />
                    )}
                  </Flex>
                </Flex>

                <Separator />

                {/* Botões */}
                {isEditing && (
                  <Flex gap="12px" justify="end">
                    <Button
                      type="button"
                      variant="soft"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </Flex>
                )}
              </Flex>
            </form>
          </Flex>
        </Card>
      </Container>
    </GlobalStyles>
  );
}
