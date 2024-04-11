import DownArrow from  '../../assets/images/down-arrow.svg'
import GrayDownArrow from  '../../assets/images/gray-down-arrow.svg'

export const DownArrowIcon = (props: {
    variant?: 'gray'|'black'
})=>{
    return props.variant==='gray'? <img src={GrayDownArrow}/>:<img src={DownArrow}/>
};

