import React from 'react'

export type ApiFetch = (input: RequestInfo, params?: RequestInit) => Promise<Response>

export type Falsy = false | 0 | "" | null | undefined
export type ApiCall = ReturnType<typeof makeApiCall>
export type UseApiCall = ReturnType<typeof makeUseApiCall>

function makeApiCall(fetchImplementation: (input: RequestInfo, params?: RequestInit) => Promise<Response>) {
  return function apiCall<T>(request: (fetch: ApiFetch) => Promise<T>): Promise<T>{
    return request(fetchImplementation)
  }
}

function makeUseApiCall(fetchImplementation: (input: RequestInfo, params?: RequestInit) => Promise<Response>) {
  return function useApiCall<T>(request: ((fetch: ApiFetch) => Promise<T>) | Falsy, deps?: React.DependencyList): T | undefined {
    const [state, setState] = React.useState<T | undefined>(undefined)
    React.useEffect(() => {
      if (request) {
        request(fetchImplementation).then(res => setState(res))
      }
    }, deps)
    return state
  }
}

export interface HttpProviderValue {
  apiCall: ApiCall
  useApiCall: UseApiCall
}

export const HttpContext = React.createContext<HttpProviderValue>({
  apiCall: makeApiCall(fetch),
  useApiCall: makeUseApiCall(fetch)
})

export const HttpConsumer = HttpContext.Consumer

export function useHttp() {
  return React.useContext(HttpContext)
}

export interface HttpProviderProps {
  children?: React.ReactNode
}

export const HttpProvider: React.FunctionComponent<HttpProviderProps> = ({ children }) => {
  const apiFetch: ApiFetch = async (url, params) => {
    const res = await fetch(url, {
      ...params
    })
    return res
  }
  return (
    <HttpContext.Provider
      value={{
        apiCall: makeApiCall(apiFetch),
        useApiCall: makeUseApiCall(apiFetch),
      }}>
      {children}
    </HttpContext.Provider>
  )
}

export const getItem = (id: string) => {
  return async (fetch: ApiFetch) => {
    const res = await fetch(`http://dummy.restapiexample.com/api/v1/employee/${id}`, { method: 'GET' })
    const json = await res.json()
    // tslint:disable-next-line
    console.log(res, json)
    return id
  }
}
