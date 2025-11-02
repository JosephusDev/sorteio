type ErrorMessages = {
  [key: string]: string;
};

export const authExceptionMessages: ErrorMessages = {
  anonymous_provider_disabled: "Logins anônimos estão desativados.",
  bad_code_verifier:
    "O código de verificação fornecido não corresponde ao esperado.",
  bad_json: "O corpo da requisição não é um JSON válido.",
  bad_jwt: "O JWT enviado no cabeçalho de autorização não é válido.",
  bad_oauth_callback:
    "O callback OAuth não possui todos os atributos necessários.",
  bad_oauth_state: "O estado do OAuth não está no formato correto.",
  captcha_failed: "O desafio captcha não pôde ser verificado.",
  conflict:
    "Conflito de banco de dados. Verifique problemas de concorrência na aplicação.",
  email_address_not_authorized:
    "O envio de e-mails não é permitido para este endereço.",
  email_conflict_identity_not_deletable:
    "Desvincular esta identidade causaria conflito com outra conta.",
  email_exists: "Este e-mail já existe no sistema.",
  email_not_confirmed: "O e-mail não foi confirmado para este usuário.",
  email_provider_disabled: "Registros com e-mail e senha estão desativados.",
  flow_state_expired:
    "O estado de autenticação expirou. Tente fazer login novamente.",
  flow_state_not_found: "O estado de autenticação não foi encontrado.",
  hook_payload_over_size_limit: "O payload excede o limite de tamanho máximo.",
  hook_timeout: "Não foi possível alcançar o hook no tempo máximo.",
  hook_timeout_after_retry:
    "Não foi possível alcançar o hook após várias tentativas.",
  identity_already_exists: "Esta identidade já está vinculada a um usuário.",
  identity_not_found: "Identidade não encontrada.",
  insufficient_aal: "O usuário precisa de um nível mais alto de autenticação.",
  invite_not_found: "O convite expirou ou já foi usado.",
  invalid_credentials: "Utilizador não encontrado.",
  manual_linking_disabled:
    "A vinculação manual está desativada no servidor de autenticação.",
  mfa_challenge_expired: "O desafio de MFA expirou. Solicite um novo.",
  mfa_factor_name_conflict: "Os fatores de MFA não podem ter o mesmo nome.",
  mfa_factor_not_found: "O fator de MFA não existe mais.",
  mfa_ip_address_mismatch:
    "A inscrição para MFA deve ocorrer com o mesmo endereço IP.",
  mfa_verification_failed: "Código TOTP incorreto.",
  mfa_verification_rejected: "A verificação de MFA foi rejeitada.",
  mfa_verified_factor_exists:
    "Fator de telefone já verificado. Remova para continuar.",
  mfa_totp_enroll_disabled: "Inscrição de fatores TOTP está desativada.",
  mfa_totp_verify_disabled: "Verificação via TOTP está desativada.",
  mfa_phone_enroll_disabled:
    "Inscrição de fatores de telefone está desativada.",
  mfa_phone_verify_disabled: "Verificação via telefone está desativada.",
  no_authorization: "Cabeçalho de autorização ausente.",
  not_admin: "O usuário não possui privilégios administrativos.",
  oauth_provider_not_supported: "O provedor OAuth não é suportado.",
  otp_disabled: "Login com OTP está desativado.",
  otp_expired: "O código OTP expirou.",
  over_email_send_rate_limit:
    "Muitas mensagens foram enviadas para este e-mail. Tente mais tarde.",
  over_request_rate_limit:
    "Muitas requisições foram feitas. Tente novamente em alguns minutos.",
  over_sms_send_rate_limit:
    "Muitas mensagens SMS foram enviadas. Tente mais tarde.",
  phone_exists: "Número de telefone já existe no sistema.",
  phone_not_confirmed: "O número de telefone não foi confirmado.",
  phone_provider_disabled: "Registros com telefone e senha estão desativados.",
  provider_disabled: "Provedor OAuth desativado.",
  provider_email_needs_verification:
    "O e-mail precisa ser verificado após o login com OAuth.",
  reauthentication_needed:
    "O usuário precisa autenticar novamente para alterar a senha.",
  reauthentication_not_valid: "A reautenticação falhou. Código incorreto.",
  request_timeout: "Processamento da requisição excedeu o tempo limite.",
  same_password: "A nova senha deve ser diferente da atual.",
  saml_assertion_no_email: "A afirmação SAML não possui um e-mail.",
  saml_assertion_no_user_id: "A afirmação SAML não possui um ID de usuário.",
  saml_entity_id_mismatch: "O ID da entidade SAML não corresponde.",
  saml_idp_already_exists: "Provedor de identidade SAML já existe.",
  saml_idp_not_found: "Provedor de identidade SAML não encontrado.",
  saml_metadata_fetch_failed:
    "Não foi possível obter os metadados do provedor SAML.",
  saml_provider_disabled: "SSO SAML 2.0 desativado.",
  saml_relay_state_expired: "Estado de relay SAML expirado.",
  saml_relay_state_not_found: "Estado de relay SAML não encontrado.",
  session_not_found: "Sessão não encontrada.",
  signup_disabled: "Registros desativados no servidor.",
  single_identity_not_deletable:
    "O usuário deve ter pelo menos uma identidade.",
  sms_send_failed: "Falha ao enviar SMS.",
  sso_domain_already_exists: "Domínio SSO já registrado.",
  sso_provider_not_found: "Provedor SSO não encontrado.",
  too_many_enrolled_mfa_factors: "Limite de fatores MFA inscritos alcançado.",
  unexpected_audience: "A audiência do token JWT não corresponde.",
  unexpected_failure: "Erro inesperado no serviço de autenticação.",
  user_already_exists: "Já existe um Usuário com este e-mail.",
  user_banned: "Usuário banido.",
  user_not_found: "Usuário não encontrado.",
  user_sso_managed: "Certos campos do usuário SSO não podem ser atualizados.",
  validation_failed: "Parâmetros fornecidos em formato inválido.",
  weak_password: "Senha fraca. A senha precisa atender aos critérios mínimos.",
  invalid_login_credentials: "Credenciais de login inválidas.",

};

export class AuthException extends Error {
  constructor(public code: string) {
    super(authExceptionMessages[code] || "Erro desconhecido.");
  }
}
