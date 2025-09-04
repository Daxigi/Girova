// prisma/seed.ts

import { PrismaClient } from '../src/generated/prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el sembrado de la base de datos...");

  // Encriptamos la contraseña una sola vez para reutilizarla o puedes usar diferentes
  const password = await hash('g1r0v42025!', 12);

  // --- Creación del primer administrador ---
  const user1 = await prisma.user.create({
    data: {
      email: 'maximilianogimenez91@gmail.com',
      name: 'Maximiliano Gimenez',
      password: password,
      // El rol por defecto es ADMIN, así que no es necesario especificarlo
    },
  });

  // --- Creación del segundo administrador ---
  const user2 = await prisma.user.create({
    data: {
      email: 'admin2@girova.com',
      name: 'Admin Secundario',
      password: password,
    },
  });

  // --- Creación del tercer administrador ---
  const user3 = await prisma.user.create({
    data: {
      email: 'admin3@girova.com',
      name: 'Admin de Contenido',
      password: password,
    },
  });

  console.log("Sembrado completado.");
  console.log({ user1, user2, user3 });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });