import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { CardContent } from './components/Card'
import { CreateModel } from './components/CreateModel';
import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
function App() {
  const [open , setOpen] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen">
            <CreateModel open={open} onClose={()=>{setOpen(false)}}/>
          <div className="">
            <Sidebar /> 
          </div>
            <div className="md:ml-100 p-8">
            <div className="flex justify-end p-4 gap-4">
              <Button startIcon= {<PlusIcon />} variant="primary" text="Add Post" size="sm" onClick={() => {setOpen(true)}}/>
              <Button startIcon= {<ShareIcon/>} variant="secondary" text="Share Posts" size="sm" onClick={() => {alert("Hello, World")}}/>
            </div>

            <div className="justify-center relative flex items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Nesting Posts.org@community</h1>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-4 bg-gray-50 p-4 space-between">
            
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
                content="Relaxing Nature Sounds - Forest Ambience ohdbhjkfbdbJBKEbfbvoboufbvobojbcjnjfcvl loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                tags={["audio", "nature", "relaxation"]}
                link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            />
            
            {/* Text Card */}
            <CardContent
                type="twitter"
                title="Text Post Example"
                content="This is a text post with some interesting content. It can be multiple lines and even include line breaks."
                tags={["announcement", "text", "update"]}
                link="https://twitter.com/narendramodi/status/1934805163405136235"
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
                content="Relaxing Nature Sounds - Forest Ambience ohdbhjkfbdbJBKEbfbvoboufbvobojbcjnjfcvl loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                tags={["audio", "nature", "relaxation"]}
                link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            />
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
                content="Relaxing Nature Sounds - Forest Ambience ohdbhjkfbdbJBKEbfbvoboufbvobojbcjnjfcvl loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                tags={["audio", "nature", "relaxation"]}
                link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            />
            
            {/* Text Card */}
            <CardContent
                type="text"
                title="Text Post Example"
                content="This is a text post with some interesting content. It can be multiple lines and even include line breaks."
                tags={["announcement", "text", "update"]}
                link="{https://example.com}"
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
                content="Relaxing Nature Sounds - Forest Ambience ohdbhjkfbdbJBKEbfbvoboufbvobojbcjnjfcvl loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.loreum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                tags={["audio", "nature", "relaxation"]}
                link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            />
            </div>
        </div>

    </div>
  

  )
}

export default App
