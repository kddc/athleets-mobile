import * as React from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import logo from '~/assets/logo.png'
import { getItem, HttpProvider, useHttp } from './http/HttpProvider'

const App: React.FunctionComponent = () => {
  const { apiCall, useApiCall } = useHttp()
  const [id, setId] = React.useState('1')
  const res = useApiCall(getItem(id), [id])

  // tslint:disable-next-line
  console.log(res)

  return (
    <HttpProvider>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image style={{ width: 192, height: 192 }} source={logo} />
        </View>
        <View style={styles.container}>
          <View style={styles.button}>
            <Button title={'Login'} onPress={() => {}} color={'#fff'} />
          </View>
          <View style={styles.button}>
            <Button
              title={'Fetch'}
              onPress={async () => {
                await apiCall(getItem('3'))
              }}
              color={'#fff'}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={'Set'}
              onPress={() => {
                setId('2')
              }}
              color={'#fff'}
            />
          </View>
        </View>
      </View>
    </HttpProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
})
