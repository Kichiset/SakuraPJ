import { StyleSheet } from 'react-native';
import axios from 'axios';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0, // Androidの場合、セーフエリアに対応するために25ポイント追加
    backgroundColor: '#444654',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4ECEE'
    ,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    alignItems: 'center',
  },
    portTitle: {
    fontSize: 24,
    marginTop: 0,
    marginBottom: 15,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  kagoFrame:{
    marginTop: 10,
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#5F3770',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  sakuraFrame:{
    marginTop: 10,
    backgroundColor: '#FCDCE0',
    borderWidth: 1,
    borderColor: '#C87D99',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  nextDeparture: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  headLineNews:{
    marginTop: 30,
    marginBottom: 0,
    borderWidth: 1,
    textColor: '#EBEBEB',
    backgroundColor: '#FFF',
    borderColor: '#1C1C1C',
    margin: 'auto',
    width: 350,
    height: 30,
    borderRadius: 255,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerColumn: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
    buttonContainer: {
    flexDirection: 'row', // 横方向に並べる
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  mainButton: {
    backgroundColor: '#D4ECEE', //白藍
    borderWidth: 1,
    borderColor: '#00A2C0', //かごんまの色（）
    marginTop: 20,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  sakuraButton: {
    backgroundColor: '#FCDCE0',
    borderWidth: 1,
    borderColor: '#C87D99',
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  kagoButton: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#5F3770',
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  buttonText: {
    color: '#1C1C1C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButtonText: {
    backgroundColor: '#EBEBEB',
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },  
  linkButtonTop: {
    marginTop: 30,
    padding: 10,
  },
  linkButton: {
    marginTop: 10,
    padding: 10,
  },
  linkButtonImage: {
    width: 200,
    height: 60,
    borderRadius: 5,
  },
    adBanner: {
    marginTop: 20,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  bannerImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});