import useLocalStorageState from 'use-local-storage-state'



export default function useLocalStorage() {
  const [localValue, setLocalValue] = useLocalStorageState("text", '');
  const [localTime, setLocalTime] = useLocalStorageState("time", '');

  return {
    localText: {
      value: localValue,
      setValue: setLocalValue,
    },
    localTime: {
      value: localTime,
      setValue: setLocalTime
    }
  }
}
