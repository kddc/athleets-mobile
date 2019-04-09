import * as React from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import logo from '~/assets/logo.png'
// import {getItem, useHttp} from '~/http/HttpProvider'

const App: React.FunctionComponent = () => {
  // const [number] = React.useState(0)

  // const { apiFetch } = useHttp()
  // const data = useApiFetch(bla(input))
  // const data = useRequest(data && blub(data))
  // request(bla(input))

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image style={{ width: 192, height: 192 }} source={logo} />
      </View>
      <View style={styles.button}>
        <Button title={"Login"} onPress={() => {}} color={"#fff"} />
      </View>
    </View>
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
    justifyContent: 'flex-end'
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  }
})
