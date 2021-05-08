export default function useBodyLock(lock) {
  const awaitDocument = typeof document !== 'undefined' ? document : null;
  if (lock && awaitDocument) {
    awaitDocument.body.style.overflow = 'hidden';
  } else if (awaitDocument) {
    awaitDocument.body.style.overflow = 'auto';
  }
}
