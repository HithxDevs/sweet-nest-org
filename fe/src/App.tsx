
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { CardContent } from './components/Card'
function App() {

  return (
    <div className="bg-white p">
      <div className="flex justify-end p-4 gap-4">
        <Button startIcon= {<PlusIcon />} variant="primary" text="Add Post" size="sm" onClick={() => {alert("Hello, World")}}/>
        <Button startIcon= {<ShareIcon/>} variant="secondary" text="Share Posts" size="sm" onClick={() => {alert("Hello, World")}}/>
      </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dynamic Content Cards</h1>
      <div className="space-y-6 p-6 bg-gray-50 flex items-center ">
            
            {/* Text Card */}
            <CardContent
                type="text"
                title="Text Post Example"
                content="This is a text post with some interesting content. It can be multiple lines and even include line breaks."
                tags={["announcement", "text", "update"]}
                link="https://example.com"
            />

            {/* Image Card */}
            <CardContent
                type="image"
                title="Image Post Example"
                content="Beautiful sunset landscape captured in the mountains"
                tags={["photography", "nature", "sunset"]}
                link="https://picsum.photos/800/600"
            />

            {/* Video Card */}
            <CardContent
                type="video"
                title="Video Post Example"
                content="Check out this amazing video content!"
                tags={["video", "entertainment", "youtube"]}
                link="https://youtu.be/JgDNFQ2RaLQ?si=Krp7JX35rgqOlg7v"
            />

            {/* Audio Card */}
            <CardContent
                type="audio"
                title="Audio Post Example"
                content="Relaxing Nature Sounds - Forest Ambience"
                tags={["audio", "nature", "relaxation"]}
                link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            />
        </div>

    </div>
  

  )
}

export default App
