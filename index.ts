import startServer from './main';
(async () => {
  await startServer();
})().catch((error) => {
  console.log(
    `An error occurred during app startup. ${JSON.stringify({ message: error.message, stacktrace: error.stack })}`
  );
});
