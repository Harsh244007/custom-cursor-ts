const CustomCursor: React.FC<CustomCursorProps> = ({
  nodeName,
  nodeText,
  setNodeName,
  loading,
  setNodeText,
  isClicked,
  onClick,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  let  mouseDebouncer:number
  useEffect(() => {

    const handleMouseMove = (event: MouseEvent) => {

      // console.log("Mouse Move : ",event.target,event.target.nodeName)
      if (event.target instanceof HTMLElement) {
        if (
          event.target.nodeName.toLowerCase() === "iframe"||
          event.target.nodeName.toLowerCase() === "h1"||
          event.target.className.includes("carousel-dot")||
          event.target.nodeName.toLowerCase() === "img"
        ) {
          if (cursorRef.current) {
            cursorRef.current.style.display = "none";
            document.body.style.cursor = "auto";
          }
        } else {
          // console.log("Mouse Move Event : ",event)
          setNodeName(event.target.nodeName);
          setNodeText(event.target.innerText);
          clearTimeout(mouseDebouncer);

          if (cursorRef.current) {
            cursorRef.current.style.display = "flex";
            document.body.style.cursor = "none";
          }
          const mouseX = event.pageX;
          const mouseY = event.pageY;
          const positionElement = () => {
            if (cursorRef.current) {
              cursorRef.current.style.top = mouseY + "px";
              cursorRef.current.style.left = mouseX + "px";
            }
          };
          positionElement();

          mouseDebouncer = window.setTimeout(() => {
            if (cursorRef.current) {
              cursorRef.current.style.display = "none";
              document.body.style.cursor = "auto";
            }
          }, 10000);

        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // document.removeEventListener("scroll", handleVideoPlay);
      clearTimeout(mouseDebouncer);
    };
  }, []);
  const words = ['Hello👋', 'Welcome', 'to My',"Portfolio"];
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); 
    return () => {
      clearInterval(timer); 
    };
  }, []);

  useEffect(() => {
    setCurrentWord(words[index]);
  }, [index])
  return (
    <section
      onClick={onClick} 
      className={`custom-cursor ${
        loading === true || nodeName.toLowerCase() === "a" ||  nodeName.toLowerCase() === "H2" || nodeName.toLowerCase() === "button" ? "hovered" : ""
      }`}
      ref={cursorRef}
    >
      <p>{loading === false && nodeName.toLowerCase() === "a" ||  nodeName.toLowerCase() === "H2" || nodeName.toLowerCase() === "button" ? nodeText===""?"Click":nodeText :loading===false? currentWord:"Welcome"}</p>
      <div />
    </section>
  );
};

<style>
{`.custom-cursor {
  z-index: 9999;
  width: fit-content;
  border-radius: 50%;
  padding: 10px;
  min-width: 60px;
  aspect-ratio: 1/1;
  display: none;
  z-index: 100 !important;
  place-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.608);
  pointer-events: none;
  transition: all 0 !important;
  transition-delay: 0 !important;
  overflow: visible;
  color: black;
  transform: translate(-50%, -50%);
  position: fixed;
  position: absolute;
  backdrop-filter: blur(2px);
  --rotate: 0deg;
}
.custom-cursor.hovered > div {
  border: 0px solid #a9e4de;
  transition: all 0ms ease-in;
  border-top-width: 6px;
  border-top-color: #0d9488;
  position: absolute;
  animation: liner 15s linear infinite;
  transition: all 0 !important;
  transition-delay: 0 !important;
  border-radius: 50%;
  width: 100%;
  aspect-ratio: 1/1;
}
@keyframes liner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(3600deg);
  }
}
.custom-cursor p {
  font-weight: bold;
  font-size: 18px;
  transition: all 0 !important;
  transition-delay: 0 !important;
  color: black;
}
@media (max-width: 1020px) {
  .custom-cursor {
    display: none !important;
  }
 }
`}
</style>


//here i am doing lot fo stuff but you can extract this and make it simple however it will also work
