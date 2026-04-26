import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scamNumbersTable = pgTable("scam_numbers", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull(),
  reportCount: integer("report_count").notNull().default(1),
  fraudType: text("fraud_type").notNull(),
  description: text("description"),
  firstReported: timestamp("first_reported").notNull().defaultNow(),
  lastReported: timestamp("last_reported").notNull().defaultNow(),
});

export const insertScamNumberSchema = createInsertSchema(scamNumbersTable).omit({ id: true, firstReported: true, lastReported: true });
export type InsertScamNumber = z.infer<typeof insertScamNumberSchema>;
export type ScamNumber = typeof scamNumbersTable.$inferSelect;
