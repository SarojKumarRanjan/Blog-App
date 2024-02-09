import { Button } from "./components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              ad vero officiis mollitia iure maxime quam, ducimus nisi eius at!
            </DrawerTitle>
            <DrawerDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              magni excepturi veritatis nulla enim dolorum quas animi
              perferendis asperiores reprehenderit, quasi facere natus
              cupiditate! Eum quo veritatis molestias, et ducimus deserunt, odit
              placeat animi, quaerat quia eaque assumenda at? Debitis iure
              facere doloremque quisquam corporis earum odit nobis distinctio,
              recusandae maiores voluptates soluta pariatur possimus
              consequuntur illo fuga doloribus fugit itaque quae similique,
              molestiae ex necessitatibus sint? Vitae, provident incidunt ex
              ducimus magni sunt, eligendi aperiam laborum vel quibusdam quidem
              commodi quo distinctio cupiditate. Perferendis, qui! Tempora
              voluptatum impedit soluta animi eligendi? Ratione reiciendis harum
              exercitationem odit nostrum consequatur iure?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
