import Request from '../models/Request.js'
import ReqItem from '../models/ReqItem.js'
import Counter from '../models/Counter.js'

//creating a relief request
export const createReq = async (req,res)=>{
    try {
        console.log(req.body)
    const { disaster_type, description, urgency_level, longitude=1234, latitude=123, items } = req.body;
    
    // console.log(req.body)
    // Create main request
    const counter = await Counter.findOneAndUpdate(
      { name: "request" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );
    const requestCode = `REQ-${String(counter.seq).padStart(3, "0")}`;

    const request = await Request.create({
      ngo_id: '123456',
      disaster_type,
      request_code: requestCode,
      description,
      urgency_level,
      location: {
        type: "Point",
        coordinates: [ longitude,latitude],
      },
    });
    console.log(request)
    // Save items
    const itemDocs = items.map((item) => ({
      request_id: request._id,
      item_name: item.name,
      quantity: Number(item.quantity),
      category: item.category,
      status:item.critical?"Critical":"Standard"
    }));

    await ReqItem.insertMany(itemDocs);

    res.status(201).json({
      success: true,
      message: "Request created successfully",
      request,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Getting the all the requset created by User
export const getMyreq = async (req,res)=>{
     try {
    const requests = await Request.find({
      ngo_id: '123456'
    }).populate("items");
    res.status(200).json({
      success: true,
      data:requests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Getting all Open Request
export const getOpenRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "open" });

    res.status(200).json({
      success: true,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get Request By ID (with items)
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    const items = await ReqItem.find({
      request_id: req.params.id,
    });

    res.status(200).json({
      success: true,
      request,
      items,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Status of the Request [open,matched,fulfilled,closed]
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      request,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};