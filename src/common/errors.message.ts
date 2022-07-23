export const ErrorsMessage = [
  {
    errorCode: 1,
    title: 'Todo mundo erra!',
    message:
      'E dessa vez foram nossos servidores. Estamos trabalhando para resolver esse problema. Por favor, tente novamente mais tarde.',
  },
  {
    errorCode: 2,
    title: 'Senha incorreta!',
    message:
      'A gente sabe que é difícil lembrar de todas as senhas. Você deve inserir a senha de 4 dígitos do seu cartão company. Tente novamente, são 4 tentativas antes do bloqueio da conta.',
  },
  {
    errorCode: 3,
    title: 'No limite!',
    message:
      'Você atingiu o limite diário de transferências. Dúvidas? Entre em contato no chat.',
  },
  {
    errorCode: 4,
    title: 'Saldo insuficiente',
    message:
      'Você não tem saldo suficiente. Coloque dinheiro na conta para continuar.',
  },
  {
    errorCode: 5,
    title: 'Chave não encontrada',
    message: 'Verifique se digitou corretamente ou tente outra chave manual.',
  },
  {
    errorCode: 6,
    title: 'Destinatário inválido',
    message: 'Não é possível enviar dinheiro para sua própria conta.',
  },
  {
    errorCode: 7,
    title: 'Aguarde o processamento',
    message:
      'Ainda não processamos a ação que você fez momentos atrás. Aguarde uns instantes e confira o seu saldo.',
  },
  {
    errorCode: 103,
    title: 'Falha no agendamento',
    message:
      'Não é possível agendar esse api porque o agendamento já foi feito antes.',
  },
  {
    errorCode: 104,
    title: 'Falha no agendamento',
    message: 'Não é possível agendar esse api porque ele já está expirado.',
  },
  {
    errorCode: 108,
    title: 'Falha no agendamento',
    message:
      'Não é possível agendar um api para uma data maior do que 6 meses a partir de hoje.',
  },
  {
    errorCode: 999,
    title: 'Atualize o aplicativo',
    message:
      'Para fazer essa transação, você precisa atualizar o aplicativo MEI Fácil para a versão mais recente disponível.',
    meta: {
      action: {
        dismiss: 'entendi',
      },
    },
  },
];
