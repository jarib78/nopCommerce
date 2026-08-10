using Nop.Web.Framework.Models;

namespace Nop.Web.Models.Checkout;

public partial record CheckoutCompletedModel : BaseNopModel
{
    public CheckoutCompletedModel()
    {
        Items = new List<CheckoutCompletedOrderItemModel>();
    }

    public int OrderId { get; set; }
    public string CustomOrderNumber { get; set; }
    public bool OnePageCheckoutEnabled { get; set; }
    public string OrderTotal { get; set; }
    public string WhatsAppNumber { get; set; }
    public IList<CheckoutCompletedOrderItemModel> Items { get; set; }
}

public partial record CheckoutCompletedOrderItemModel : BaseNopModel
{
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public string AttributeInfo { get; set; }
}
