import { Inner } from "~/shared-components/list/Inner";
import { Item } from "~/shared-components/list/Item";
import { Label } from "~/shared-components/list/Label";
import { List as BaseList } from "~/shared-components/list/List";

type ListCompoundComponent = typeof BaseList & {
  Label: typeof Label;
  Inner: typeof Inner;
  Item: typeof Item;
};
const List = BaseList as ListCompoundComponent;

List.Label = Label;
List.Inner = Inner;
List.Item = Item;

export { List };
