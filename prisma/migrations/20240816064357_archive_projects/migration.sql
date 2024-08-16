-- AlterTable
CREATE SEQUENCE column_order_seq;
ALTER TABLE "Column" ALTER COLUMN "order" SET DEFAULT nextval('column_order_seq');
ALTER SEQUENCE column_order_seq OWNED BY "Column"."order";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
CREATE SEQUENCE task_order_seq;
ALTER TABLE "Task" ALTER COLUMN "order" SET DEFAULT nextval('task_order_seq');
ALTER SEQUENCE task_order_seq OWNED BY "Task"."order";
