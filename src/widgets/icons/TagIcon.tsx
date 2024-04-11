import Tag from  '../../assets/images/tag-icon.svg'
import BlackTag from  '../../assets/images/black-tag-icon.svg'

export const TagIcon = (props:{
    marked: boolean
})=>{
    return props.marked? <img className='h-[19px] w-[19px]' src={BlackTag}/>: <img className='h-[19px] w-[19px]' src={Tag}/>
};

