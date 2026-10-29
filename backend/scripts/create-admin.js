import "dotenv/config";

import mongoose from "mongoose";

import argon2 from "argon2";

import readline from "node:readline/promises";

import {
  stdin,

  stdout,
} from "node:process";

import Admin from "../src/models/Admin.js";

import {
  connectDatabase,
} from "../src/config/database.js";

const rl = readline.createInterface({
  input: stdin,

  output: stdout,
});

const createAdmin = async () => {
  try {
    await connectDatabase();

    const existingAdmin =
      await Admin.exists({});

    if (existingAdmin) {
      throw new Error(
        "An admin already exists. Public registration is disabled."
      );
    }

    const name = (
      await rl.question("Admin name: ")
    ).trim();

    const email = (
      await rl.question("Admin email: ")
    )
      .trim()
      .toLowerCase();

    const password = await rl.question(
      "Admin password: "
    );

    if (
      !name ||
      !email ||
      password.length < 12 ||
      password.length > 128
    ) {
      throw new Error(
        "Invalid input. Password must be 12-128 characters."
      );
    }

    const passwordHash =
      await argon2.hash(password, {
        type: argon2.argon2id,
      });

    await Admin.create({
      name,

      email,

      password: passwordHash,

      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );
  } catch (error) {
    console.error(
      "Admin creation failed:",

      error.message
    );

    process.exitCode = 1;
  } finally {
    rl.close();

    await mongoose.connection.close();
  }
};

createAdmin();