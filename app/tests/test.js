import prisma from "../prisma.js";

const createUser = (params) => {
  prisma.$connect();
  prisma.student.create({
    data: params,
  });
  prisma.$disconnect();
};

createUser({
  id: crypto.randomUUID(),
  name: "matrizz",
  email: "henriqueluizsoarestop10@gmail.com",
  phone: "13997143762",
  image: new Image(),
  address: "Celeste de Jesus Alves dos Santos, 15",
  birth: new Date().setFullYear(2006),
  createdAt: new Date(),
  updatedAt: new Date(),
});
