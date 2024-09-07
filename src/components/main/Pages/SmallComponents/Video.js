function Video(props) {
    return (
       <div className="col border border-3 rounded-3 t_sub_c p-1  z-1" style={{width:"95%",height:300}}>
         <iframe  src={props.src}  className="w-100 h-100" allowfullscreen></iframe>
       </div>
      );
}

export default Video;