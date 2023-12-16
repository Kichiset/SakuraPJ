import { StyleSheet } from 'react-native';
import axios from 'axios';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D4ECEE',
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
  DepartPortTitle: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  currentTime: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  current4DepartureTime: {
    fontSize: 30,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 'bold',
    alignItems: 'center',
  },
    portTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
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
    width: 210,
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
    width: 210,
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
  shareLink:{
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    margin: 'auto',
    width: 200,
    height: 60,
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
  notificationColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
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
  ResetButton: {
    backgroundColor: '#ECC521',
    borderWidth: 2,
    borderColor: '#B92021', //かごんまの色（）
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: 100,
    height: 50,
    borderRadius: 100,
  },
  backButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row', // ボタンを横並びに配置
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    margin: 'auto',
  },
  noticeColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom : 5,
  },
  sakuraButton: {
    backgroundColor: '#FCDCE0',
    borderWidth: 1,
    borderColor: '#C87D99',
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
  },
  kagoButton: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#5F3770',
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
  },
  buttonText: {
    color: '#1C1C1C',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  explainText: {
    color: '#1C1C1C',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
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
  seletKagoTopButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 0,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
  },
  seletSakuTopButton: {
    backgroundColor: '#FCDCE0', //白藍
    borderWidth: 1,
    marginTop: 0,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
  },
    seletKagoButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
  },
    seletSakuButton: {
    backgroundColor: '#FCDCE0',
    borderWidth: 1,
    marginTop: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 180,
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
  bannerDescription:{
      color:'#DFAF89'
  }
});