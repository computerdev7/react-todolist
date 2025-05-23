import { create } from 'zustand'
import axios from "axios";

export const useStore = create((set)=> ({
    sidebar: false,
    sidebarsh: ()=> set((state)=> ({sidebar: !state.sidebar})),
    labelNotesToggle : false,
    labelNotesTrue : ()=> set(()=> ({labelNotesToggle : true})),
    labelNotesFalse : ()=> set(()=> ({labelNotesToggle : false})),
    labelData:'',
    setLabelData: (value) => set({labelData: value}),
    showLabelData : [],
    showlabel : () => {
        let token = localStorage.getItem('token');
        try{
            axios.get('http://localhost:3000/label/get',{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(res=> {
                set({showLabelData : res.data.message})
            })
        }catch(err){
            console.log('err in showing label data')
        }
    },
    showLabelNote : [],
    setShowLabelNote : (value) => set(()=> ({
        showLabelNote : value
    }))
}))