import { db } from "@/config/data-source";
import { Question } from "@/entities/Question";

const questionRepository = db.getRepository(Question);

export const listQuestions = async () => {

  return questionRepository.find({
    order: { createdAt: "DESC" }
  });
};

export const getQuestion = async (id: number) => {

  return questionRepository.findOne({
    where: { id },
  });
};

export const createQuestion = async (payload: any, userId: number) => {


  const question = questionRepository.create({
    ...payload,
    createdBy: userId
  });

  return questionRepository.save(question);
};

export const updateQuestion = async (id: number, payload: any = {}) => {


  await questionRepository.update(id, payload);
  return questionRepository.findOne({
    where: { id },
  });
};

export const deleteQuestion = async (id: number) => {

  const result = await questionRepository.delete(id);
  return result.affected! > 0;
};

export const getQuestions = async () => {
  return questionRepository.find({
    order: { createdAt: "DESC" }
  });
};



export const listQuestionsForQuiz = async () => {
  const questions = await questionRepository.find({
    take: 10
  });
  return questions.map((q) => ({
    id: q.id,
    questionText: q.questionText,
    options: q.options,
  }));
};

export const submitAnswers = async (payload: {
  answers: { questionId: number; answer: number }[]
  timeTaken: number

}
) => {
  const { answers, timeTaken } = payload
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error("Answers must be a non-empty array");
  }

  const questions = await questionRepository.find();
  const qById = new Map(questions.map((q) => [q.id, q]));

  let correct = 0;
  for (const a of answers) {
    const q = qById.get(a.questionId);
    if (!q) continue;
    if (q.correctAnswer === a.answer) correct++;
  }

  return {
    score: correct,
    total: answers.length,
    correct,
    timeTaken
  };
};