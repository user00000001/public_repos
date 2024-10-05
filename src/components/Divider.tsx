import React from "react";
import {
  Divider,
} from "antd";

export const Horizontal: React.FC = () => (
  <>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit consectetur doloremque vero molestiae modi laboriosam recusandae consequatur totam commodi aperiam. Minus architecto distinctio officiis provident quia aut fugit minima, ad saepe impedit consectetur molestiae eos doloribus dolore temporibus soluta nesciunt facilis? Laboriosam provident distinctio porro perspiciatis modi similique deleniti voluptatem architecto ut minus libero consectetur vero asperiores nam aperiam harum iste deserunt tempora delectus autem, dignissimos alias velit maxime sapiente! Nihil facere hic nostrum consequuntur dolores rerum, impedit eaque deleniti natus, sunt vel sed aperiam quibusdam pariatur! Fugit ducimus quaerat iusto impedit, tempore iste qui, doloribus debitis facere amet laboriosam!</p>
    <Divider />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem alias ipsam neque aut hic temporibus ad obcaecati quos molestias cupiditate explicabo dolores ullam adipisci in blanditiis laudantium molestiae, minima reiciendis necessitatibus? Quibusdam fugit eaque dolorum, minus corrupti quos rem incidunt quia culpa, laborum atque! Quisquam dolores natus sunt quaerat fugit!</p>
    <Divider dashed />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nisi pariatur at suscipit, dignissimos hic maiores. Nemo exercitationem ratione laudantium at quis aspernatur sapiente autem vel sint nesciunt eos, consectetur ut distinctio debitis, molestiae eum deleniti, vero dolorum aperiam officia natus! Impedit facilis quasi iure natus praesentium iusto, deserunt eligendi!</p>
  </>
);

export const DividerWithTitle: React.FC = () => (
  <><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo commodi quia accusantium numquam culpa adipisci dolore, illum nesciunt laboriosam reiciendis?</p>
    <Divider>Text</Divider>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis asperiores unde, tempora doloremque in totam aspernatur qui nobis ipsam delectus?</p>
    <Divider orientation="left">Left Text</Divider>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam hic fugiat temporibus ex minima possimus obcaecati recusandae nam maxime sequi.</p>
    <Divider orientation="right">Right Text</Divider>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, voluptate similique. Harum voluptate, autem eos nostrum reprehenderit distinctio corporis maxime!</p>
    <Divider orientation="left" orientationMargin="0">Left Text with 0 orientationMargin</Divider>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur neque eaque qui pariatur magni eum porro sit ab nemo exercitationem quis similique nam alias, quae necessitatibus, quos dignissimos. Harum, nulla!</p>
    <Divider orientation="right" orientationMargin="50px">Right Text with 50px orientationMargin</Divider>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est unde dolorem possimus aliquam, asperiores blanditiis illum rem totam repellat nobis numquam. Nemo asperiores dicta dolorum nihil cum in quam ipsa?</p>
  </>
);

export const TextWithoutHeadingStyle: React.FC = () => (
  <><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eius expedita nulla delectus culpa id omnis ut porro. Modi quis quaerat, architecto totam nulla tempora cupiditate doloribus sapiente similique maxime?</p>
    <Divider plain>Text</Divider>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, aliquid eaque debitis assumenda ad nisi possimus magni iusto, aliquam corrupti officia vero cum beatae eos, harum autem at voluptatem accusamus?</p>
    <Divider orientation="left" plain>Left Text</Divider>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam obcaecati provident labore reiciendis. Voluptatum sequi optio a placeat, quae voluptate perferendis veniam. Cupiditate laborum unde eos aliquid fuga sit eligendi!</p>
    <Divider orientation="right" plain>Right Text</Divider><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores eum, debitis quidem repudiandae perspiciatis harum deleniti minima dolore consectetur amet fugit ad. Architecto nesciunt doloremque ab provident laboriosam veniam voluptates.</p><Divider /><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit placeat iste excepturi iure. Eos reprehenderit sequi quo voluptate praesentium distinctio temporibus saepe! Doloremque nostrum ex eos rem mollitia quam commodi.</p>
  </>
);

export const Vertical: React.FC = () => (
  <>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </>
);

export default [
  {
    label: "Divider - Horizontal",
    children: <Horizontal />
  },
  {
    label: "Divider - Divider with title",
    children: <DividerWithTitle />
  },
  {
    label: "Divider - Text without heading style",
    children: <TextWithoutHeadingStyle />
  },
  {
    label: "Divider - Vertical",
    children: <Vertical />
  },
]