<template>
<div>
    <center>
    <br>
    <br>
    <br>
    <br>
    <b-card
    no-body
    style="max-width: 30rem;"
    img-top
    >
    <template v-slot:header>
      <h4 class="mb-0">My page</h4>
    </template>

    <b-card-body>
      <b-card-title><div id='customer_id'>username 회원님 환영합니다!</div></b-card-title>
      <br>
      <b-card-text>
        회원님이 예약하신 차량 내역입니다.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
        <hr>
      <b-list-group-item><div id=name>차량정보가없습니다</div></b-list-group-item> 
      <b-list-group-item><div id='car_code'>차량정보가없습니다</div></b-list-group-item>
      <b-list-group-item>픽업 :<div id='startdate'> </div></b-list-group-item>
      <b-list-group-item>반납 :<div id='endtdate'> </div></b-list-group-item>
    </b-list-group>

    <b-card-body>
      <b-button type="submit" @click="onGoMainpage" block variant="primary">메인 화면</b-button>
      <b-button type="submit" @click="onReserDelete" block variant="primary">예약 취소</b-button>
    </b-card-body>

    <b-card-footer>bespinCar</b-card-footer>

  </b-card>
    </center>
    <br>
    <br>
    <br>
    <br>
</div>  
</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js" ></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
var id = "";
var code = "";
export default {
  name: 'profile',
  data() {
    return {
      content: ''
    }
  },
  mounted:function() {
    // 여기에서 나의 예약 현황 뿌려주기
    id = localStorage.getItem("customer").split("@")[1];
    axios.get('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/mybooking/'+id)
    .then(function(response){
      //code = response.data[0].code;
      var cnt = response.data.length-1;
      document.querySelector("#customer_id").innerHTML = id+" 회원님 환영합니다!";
      document.querySelector("#name").innerHTML = response.data[cnt].name;
      document.querySelector("#car_code").innerHTML = "차 코드: "+response.data[cnt].code;
      document.querySelector("#startdate").innerHTML = "픽업 :"+response.data[cnt].reservation.startdate;
      document.querySelector("#enddate").innerHTML = "반납 : "+response.data[cnt].reservation.enddate;
    });
  },
  methods:{
  onGoMainpage() {
    this.$router.push('/main');
  },
  onReserDelete(){
    axios.delete('http://ec2-13-209-82-206.ap-northeast-2.compute.amazonaws.com:8090/v0.0.3/crbs/mybooking/'+id+'/'+code)
  .then(function(response){
    console.log(response);
    alert('예약이 취소되었습니다 !');
  })
  .catch(function (error) {
    alert("당일취소는 불가능합니다!");
  });
}
},
}
</script>