import express, { Request, Response } from "express";
import http from "http";
import omicRouter from "../routes/omics";
import cors from "cors";
import path from "path";

export async function startHttpServer(app: express.Application): Promise<void> {
  const httpServer = http.createServer(app);
  app.use(express.json());
  app.use(
    cors({
      origin: true,
    })
  );
  console.log(__dirname);
  // app.use(express.static(path.join(__dirname, "../../build")));
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Omics Data Retrieval and Analysis System!");
  });
  app.use("/omics", omicRouter);
  return new Promise<void>((resolve) => {
    httpServer.listen(process.env.HTTP_PORT, () => {
      console.log(
        `Http server started on port ${process.env.HTTP_PORT} (http://localhost:${process.env.HTTP_PORT})`
      );
      resolve();
    });
  });
}
