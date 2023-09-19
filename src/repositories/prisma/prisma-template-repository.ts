import { prisma } from "../../database/prisma";
import { TemplateCreateData, TemplateDelete, TemplateFind, TemplateRepository, TemplateUpdate } from "../interfaces/template/template-repository";


interface ChecklistID{
  id: string;
}

export class PrismaTemplateRepository implements TemplateRepository {


  async create({name, checklist}:TemplateCreateData) {
    const data:any = {
      name,
      Checklist: {
        connect: checklist?.map((check:ChecklistID) => ({
          id: check.id
        }))
      }
    }

    return await prisma.template.create({ data });
  }
  
  async get() {
      const templates = await prisma.template.findMany({
        select: {
          name: true,
          Checklist: true
        }
      })
      return templates;
  }

  async find({ id }: TemplateFind) {
    const template = await prisma.template.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        Checklist: true
      }
    });
    return template
  }

  async delete({ id }: TemplateDelete) {
    await prisma.template.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, name, checklist}: TemplateUpdate) {
    await prisma.template.update({
      where: {
        id
      },
      data: {
        name,
        Checklist: {
          connect: checklist?.map((check:ChecklistID) => ({
            id: check.id
          }))
        }
      }
    });
  }
}