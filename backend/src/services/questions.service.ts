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

export const getQuestionsByUser = async (userId: number) => {

  return questionRepository.find({
    where: { createdBy: userId },
    order: { createdAt: "DESC" }
  });
};