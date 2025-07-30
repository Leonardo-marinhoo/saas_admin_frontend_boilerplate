# Implementação de Autenticação Persistente

## Resumo das Mudanças

Esta implementação atualiza a lógica de autenticação para manter o usuário logado mesmo após recarregar a página, usando Redux Toolkit e RTK Query.

## Arquivos Criados/Modificados

### Novos Arquivos

1. **`src/store/authSlice.ts`** - Slice do Redux para gerenciar estado de autenticação
2. **`src/services/api/authApi.ts`** - API de autenticação com RTK Query
3. **`src/services/api/baseQueryWithReauth.ts`** - Middleware para reautenticação
4. **`src/components/AuthInitializer.tsx`** - Componente para inicializar autenticação
5. **`src/hooks/useAuth.ts`** - Hook personalizado para autenticação
6. **`src/types/auth.ts`** - Tipos centralizados para autenticação

### Arquivos Modificados

1. **`src/store.ts`** - Adicionado authSlice e authApi
2. **`src/contexts/AuthContext.tsx`** - Integrado com Redux
3. **`src/services/api/baseApi.ts`** - Removida lógica de redirecionamento
4. **`src/routes.tsx`** - Atualizado ProtectedRoute
5. **`src/App.tsx`** - Adicionado AuthInitializer

## Funcionalidades Implementadas

### 1. Persistência de Token
- Token salvo no localStorage
- Verificação automática ao carregar a aplicação
- Configuração automática do RTK Query

### 2. Busca Automática do Usuário
- Endpoint `/api/tenant/user` para buscar dados do usuário logado
- Hook `useGetMeQuery()` disponível para componentes
- Sincronização automática com o estado do Redux

### 3. Middleware de Reautenticação
- Tratamento automático de tokens inválidos (401)
- Limpeza do localStorage em caso de erro
- Redirecionamento para login quando necessário

### 4. Verificação de Assinatura
- Verificação automática de assinatura vencida em todas as rotas
- Redirecionamento automático para página de assinatura
- Hooks `useSubscriptionError()` e `useSubscriptionErrorMutation()`
- Tratamento centralizado de erros de assinatura

### 5. Estado de Loading
- Indicadores de carregamento durante autenticação
- Prevenção de redirecionamentos prematuros
- UX melhorada com feedback visual

## Como Usar

### Hook de Autenticação
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Carregando...</div>;
  if (!isAuthenticated) return <div>Não autenticado</div>;
  
  return <div>Bem-vindo, {user?.name}!</div>;
}
```

### Verificação de Assinatura em Queries
```typescript
import { useGetProductsQuery } from '../services/api/productsApi';
import { useSubscriptionError } from '../hooks/useSubscriptionError';

function ProductsComponent() {
  const { data: products, error } = useGetProductsQuery();
  
  // Verificar erros de assinatura automaticamente
  useSubscriptionError(error);
  
  return <div>{/* seu componente */}</div>;
}
```

### Verificação de Assinatura em Mutations
```typescript
import { useCreateProductMutation } from '../services/api/productsApi';
import { useSubscriptionErrorMutation } from '../hooks/useSubscriptionErrorMutation';

function CreateProductComponent() {
  const [createProduct, { error }] = useCreateProductMutation();
  
  // Verificar erros de assinatura automaticamente
  useSubscriptionErrorMutation(error);
  
  const handleSubmit = async () => {
    try {
      await createProduct(productData).unwrap();
    } catch (error) {
      // Erro será tratado automaticamente pelo hook
    }
  };
  
  return <div>{/* seu componente */}</div>;
}
```

### Login
```typescript
import { useAuth } from '../contexts/AuthContext';

function LoginComponent() {
  const { signIn } = useAuth();
  
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // Redirecionamento automático para /pdv
    } catch (error) {
      // Tratamento de erro
    }
  };
}
```

### Logout
```typescript
import { useAuth } from '../contexts/AuthContext';

function LogoutButton() {
  const { signOut } = useAuth();
  
  const handleLogout = () => {
    signOut(); // Limpa localStorage e redireciona para /login
  };
}
```

## Fluxo de Autenticação

1. **Carregamento da Aplicação**
   - AuthInitializer verifica se há token no localStorage
   - Se há token, faz requisição para `/api/tenant/user`
   - Se sucesso, atualiza estado do Redux
   - Se erro 401, limpa token e redireciona para login

2. **Login**
   - Usuário submete credenciais
   - API retorna token e dados do usuário
   - Token salvo no localStorage
   - Estado do Redux atualizado
   - Redirecionamento para `/pdv`

3. **Requisições Autenticadas**
   - RTK Query automaticamente inclui token no header
   - Se token inválido, middleware trata erro 401
   - Limpeza automática do localStorage
   - Redirecionamento para login

4. **Logout**
   - Limpa token do localStorage
   - Reseta estado do Redux
   - Redirecionamento para `/login`

## Benefícios

- ✅ Usuário permanece logado após recarregar página
- ✅ Tratamento automático de tokens expirados
- ✅ Verificação automática de assinatura vencida
- ✅ Redirecionamento automático para página de assinatura
- ✅ Estado centralizado com Redux
- ✅ Tipagem TypeScript completa
- ✅ Separação clara entre auth e dados
- ✅ UX melhorada com loading states
- ✅ Código limpo e organizado 