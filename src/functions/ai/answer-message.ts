
import { generateText } from 'ai'
import { openai } from '../../ai/client'
import { postgresTool } from '../../tools/postgres-tool'
import { safeExecute } from '../../utils/safeExecute'

export const answerMessage = async (message: string) =>
  safeExecute(async () => {

    const answer = await generateText({
      model: openai,
      prompt: message,
      tools: {
        postgresTool
      },
      system:
        'Você é uma IA responsável por analisar dados do banco de dados, responda de forma direta, somente com o que o usuário pediu.',
      maxSteps: 5,
    })
    
    return { answer: answer.text }
  }, 'Can not answer message.')