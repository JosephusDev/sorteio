import React, { useState } from "react";
import { View, ScrollView, Linking, TouchableOpacity } from "react-native";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

export function Help() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    {
      categoria: "Sistema de Apostas",
      perguntas: [
        {
          pergunta: "Como funciona o sistema de apostas?",
          resposta:
            "Cada produto tem um preço final dividido pelo número de participantes. Você paga uma fração do valor total + taxa da plataforma. Ao atingir o número necessário de apostas, o sistema sorteia aleatoriamente um vencedor que recebe o produto.",
        },
        {
          pergunta: "Como é calculado o valor da minha aposta?",
          resposta:
            "Exemplo: Produto de 2.000.000 Kz com 2.000 participantes = 1.000 Kz cada + taxa de 1% (10 Kz). Total por participante: 1.010 Kz. O valor já inclui a taxa da plataforma.",
        },
        {
          pergunta: "Quem pode participar das apostas?",
          resposta:
            "Qualquer pessoa maior de 18 anos pode participar. Basta criar uma conta, verificar seu email/número de telefone e adicionar saldo para começar a apostar.",
        },
      ],
    },
    {
      categoria: "Pagamentos e Taxas",
      perguntas: [
        {
          pergunta: "Quais métodos de pagamento são aceitos?",
          resposta:
            "Integramos com gateways de pagamento locais e internacionais. Aceitamos transferências bancárias, cartões e outros métodos disponíveis em Angola.",
        },
        {
          pergunta: "Como funciona a taxa da plataforma?",
          resposta:
            "Cobramos 1% sobre o valor total do produto em apostas. Esta taxa é dividida entre todos os participantes e garante a manutenção da plataforma.",
        },
        {
          pergunta: "O vencedor precisa pagar algo adicional?",
          resposta:
            "Não. O valor arrecadado já cobre o preço total do produto e a taxa da plataforma. O vencedor recebe o produto sem custos adicionais.",
        },
      ],
    },
    {
      categoria: "Processo de Sorteio",
      perguntas: [
        {
          pergunta: "Como é garantido que o sorteio é justo?",
          resposta:
            "Implementamos mecanismos de auditoria e transparência. O sorteio usa função aleatória segura e todos os participantes são notificados do resultado.",
        },
        {
          pergunta: "Quando ocorre o sorteio?",
          resposta:
            "O sorteio acontece automaticamente quando o número necessário de participantes é atingido. Todos os participantes são notificados por email ou SMS.",
        },
        {
          pergunta: "Posso cancelar minha aposta?",
          resposta:
            "Não. As apostas são compromissos financeiros irrevogáveis. Certifique-se do valor antes de confirmar sua participação.",
        },
      ],
    },
    {
      categoria: "Marketplace Tradicional",
      perguntas: [
        {
          pergunta: "Posso vender produtos normalmente?",
          resposta:
            "Sim! Qualquer parceiro pode cadastrar e vender produtos no marketplace tradicional, similar ao OLX ou Jumia, com comissão de 5% sobre vendas diretas.",
        },
        {
          pergunta: "Como me torno um vendedor parceiro?",
          resposta:
            "Entre em contato conosco para cadastrar sua loja, escola ou empresa. Oferecemos diferentes planos de assinatura conforme suas necessidades.",
        },
      ],
    },
  ];

  return (
    <ScrollView
      className="flex-1 px-6 pt-6 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-md font-urbanist-bold text-gray-600">
          Tire suas dúvidas sobre nosso sistema de apostas, marketplace e
          serviços
        </Text>
      </View>

      {faqData.map((categoria, catIndex) => (
        <View key={catIndex} className="mb-6">
          <Text className="text-base font-urbanist-semiBold text-gray-900 mb-3">
            {categoria.categoria}
          </Text>

          {categoria.perguntas.map((item, questIndex) => {
            const uniqueIndex = catIndex * 10 + questIndex;
            const isOpen = openQuestion === uniqueIndex;

            return (
              <View
                key={uniqueIndex}
                className="mb-2 border border-gray-200 rounded-lg"
              >
                <TouchableOpacity
                  className="flex-row justify-between items-center p-4"
                  onPress={() => setOpenQuestion(isOpen ? null : uniqueIndex)}
                  activeOpacity={0.8}
                >
                  <Text className="flex-1 text-base font-medium text-gray-900 mr-2">
                    {item.pergunta}
                  </Text>
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#6366F1"
                  />
                </TouchableOpacity>

                {isOpen && (
                  <View className="px-4 pb-4 border-t border-gray-200">
                    <Text className="text-sm text-gray-600 mt-3">
                      {item.resposta}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}

      <View className="bg-blue-50 rounded-lg p-6 mb-20">
        <Text className="text-lg font-semibold text-center text-gray-900 mb-2">
          Precisa de mais ajuda?
        </Text>
        <Text className="text-sm text-center text-gray-600 mb-4">
          Entre em contato com nossa equipe de suporte
        </Text>
        <Button
          title="Contatar Suporte"
          onPress={() => Linking.openURL("mailto:jbsil@hotmail.com")}
          className="mt-2"
        />
        <TouchableOpacity
          className="mt-6"
          onPress={() => Linking.openURL("tel:+244924831314")}
        >
          <Text className="text-center text-primary text-sm">
            924 831 314 / 923 229 991
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
