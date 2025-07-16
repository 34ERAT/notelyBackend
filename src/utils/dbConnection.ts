import { PrismaClient } from "@prisma/client";

class DBConnection extends PrismaClient {
  private static instance: DBConnection;
  private constructor() {
    super();
    this.shutdownHooks();
  }
  public static getConnection() {
    if (!DBConnection.instance) this.instance = new DBConnection();
    return DBConnection.instance;
  }
  private shutdownHooks() {
    const shutdown = async () => {
      console.info("closing DBConnection");
      await this.$disconnect();
      console.info("DBConnection close");
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
}

export default DBConnection.getConnection();
