import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

const prizeData: Prisma.PrizeCreateManyInput[] = [
  {
    UUID: uuid(),
    title: '+1 попытка',
    probability: 0.499999999999,
    degree: 300,
    description: null,
    date: null
  },
  {
    UUID: uuid(),
    title: 'Скидка 10%',
    probability: 0.15,
    degree: 270,
    description: 'На любой курс подготовки к ${direction}',
    date: null
  },
  {
    UUID: uuid(),
    title: 'Скидка 5%',
    probability: 0.25,
    degree: 150,
    description: 'На любой курс подготовки к ${direction}',
    date: null
  },
  {
    UUID: uuid(),
    title: 'Годовой курс',
    probability: 0.000000000001,
    degree: 90,
    description: 'На любой курс подготовки к ${direction}',
    date: null
  },
  {
    UUID: uuid(),
    title: '1 Месяц подготовки',
    probability: 0,
    degree: 0,
    description: 'На любой курс подготовки к ${direction}',
    date: null
  },
  {
    UUID: uuid(),
    title: '+1 попытка',
    probability: 0,
    degree: 240,
    description: null,
    date: null
  },
  {
    UUID: uuid(),
    title: '+1 попытка',
    probability: 0,
    degree: 180,
    description: null,
    date: null
  },
  {
    UUID: uuid(),
    title: 'Air Pods',
    probability: 0.000000000001,
    degree: 330,
    description: 'Мы сами свяжемся с тобой',
    date: new Date('August 02, 2021 00:00:00')
  },
  {
    UUID: uuid(),
    title: 'Электросамокат',
    probability: 0.000000000001,
    degree: 210,
    description: 'Мы сами свяжемся с тобой',
    date: new Date('August 03, 2021 00:00:00')
  },
  {
    UUID: uuid(),
    title: 'iPad',
    probability: 0.000000000001,
    degree: 120,
    description: 'Мы сами свяжемся с тобой',
    date: new Date('August 04, 2021 00:00:00')
  },
  {
    UUID: uuid(),
    title: 'MacBook Air',
    probability: 0.000000000001,
    degree: 30,
    description: 'Мы сами свяжемся с тобой',
    date: new Date('August 05, 2021 00:00:00')
  },
  {
    UUID: uuid(),
    title: 'Промокод на 500 руб.',
    probability: 0.1,
    degree: 60,
    description: 'На любой курс подготовки к ${direction}',
    date: null
  },
];

async function main() {
  let setting = await prisma.setting.findFirst();

  if (!setting) {
    setting = await prisma.setting.create({
      data: {
        UUID: uuid(),
        seeded: false
      }
    });
  }

  if (!setting.seeded) {
    console.log(`Наполнение базы данных начальными данными...`);
  
    const { count: prizeCount } = await prisma.prize.createMany({ data: prizeData });
    console.log(`Создано ${prizeCount} первоначальных призов`);

    await prisma.setting.update({
      data: { ...setting, seeded: true },
      where: { UUID: setting.UUID }
    });
    console.log(`Наполнение базы данных данными закончено`);
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
