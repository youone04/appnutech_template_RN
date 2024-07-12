export const fetchAPi:Function = async(payload: any) => {
    try{
        const response  = await fetch(payload.url)
        const data = response.json();
        payload.setData({
            data: await data,
            loading: false
        });
    }catch(error){
        payload.setData({
            error: error,
            loading: false
        });        

    }
}

//pengguanaan
// const [doaList, setDoaList] = useState({
//     loading: true,
//     data: []
//   });

//   useEffect(() => {
//     async function fetchData() {
//       await fetchAPi({
//         url: lisApi.doa,
//         setData: setDoaList
//       });
//     }
//     fetchData()

//   }, [])